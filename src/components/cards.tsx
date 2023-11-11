import { queryGQL } from "arweavekit";
import { useContext, useEffect, useMemo, useState } from "react";
import AtomicAssetCard from "./atomic-asset-card";
import SearchContext from "../contexts/searchContext";


async function fetchArweaveTransactionDetails(txId:string) {
  const gqlQuery = `
    query {
      transaction(id: "${txId}") {
        tags {
          name
          value
        }
        data {
          size
          type
        }
      }
    }
  `;
  try {
    const response = await queryGQL(gqlQuery, {
      gateway: "arweave.net",
      filters: {},
    });
    return response.data.transaction;
  } catch (error) {
    console.error("Error fetching Arweave transaction details:", error);
  }
}


export default function Cards(){
     const [arweaveData, setArweaveData] = useState({
       transactionIds: [],
       transactionDetails: [],
       detailsMap: new Map(),
     });

     const {search} = useContext(SearchContext);

     // Fetch initial transaction IDs
     useEffect(() => {
       async function fetchInitialTransactionIds() {
         try {
           const response = await fetch(
             "https://arweave.net/qdpvt3ZKMTqOpuqYSqPhEyRrQMCLbfl_aa33acDYnFQ"
           );
           const jsonData = await response.json();
           setArweaveData((prevData) => ({
             ...prevData,
             transactionIds: jsonData.items,
           }));
         } catch (error) {
           console.error(
             "Error fetching initial Arweave transaction IDs:",
             error
           );
         }
       }
       fetchInitialTransactionIds();
     }, []);

     // Fetch transaction details
     useEffect(() => {
       if (!arweaveData.transactionIds.length) return;

       async function fetchTransactionDetails() {
         try {
           const detailPromises = arweaveData.transactionIds.map((id) =>
             fetchArweaveTransactionDetails(id)
           );
           const details = await Promise.all(detailPromises);
           setArweaveData((prevData) => ({
             ...prevData,
             transactionDetails: details,
           }));
         } catch (error) {
           console.error("Error fetching transaction details:", error);
         }
       }
       fetchTransactionDetails();
     }, [arweaveData.transactionIds]);

     // Map transaction details to IDs
     useEffect(() => {
       if (!arweaveData.transactionDetails.length) return;

       const processTransactionDetails = (transaction) => {
         const titleTag = transaction.tags.find((tag) => tag.name === "Title");
         const descriptionTag = transaction.tags.find(
           (tag) => tag.name === "Description"
         );
         return { title: titleTag?.value, description: descriptionTag?.value };
       };

       const transactionMap = new Map();
       arweaveData.transactionDetails.forEach((detail, index) => {
         const details = processTransactionDetails(detail);
         transactionMap.set(arweaveData.transactionIds[index], details);
       });

       setArweaveData((prevData) => ({
         ...prevData,
         detailsMap: transactionMap,
       }));
     }, [arweaveData.transactionDetails, arweaveData.transactionIds]);

      const filteredTransactionIds = useMemo(() => {
        if (!search) return arweaveData.transactionIds; // No filtering if search is empty

        return arweaveData.transactionIds.filter((txId) => {
          const details = arweaveData.detailsMap.get(txId);
          return details?.title.toLowerCase().includes(search.toLowerCase());
        });
      }, [search, arweaveData.transactionIds, arweaveData.detailsMap]);

     return (
       <div className="container mx-auto mt-5">
        
         <div className="grid grid-cols-5 gap-4">
           {filteredTransactionIds.map((txId, index) => (
             <AtomicAssetCard
               key={txId}
               txId={txId}
               index={index}
               arweaveData={arweaveData}
             />
           ))}
         </div>
       </div>
     );
}