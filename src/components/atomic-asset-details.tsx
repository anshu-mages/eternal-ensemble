import  { useEffect, useState } from "react";
import { readContractState } from "arweavekit/contract";


function AtomicAssetDetails({ id }: { id: string }) {
  
  const [assetData, setAssetData] = useState(null);

  useEffect(() => {
    const fetchDetails = async (id: string) => {
      const response = await readContractState({
        environment: "mainnet",
        contractTxId: id,

        evaluationOptions: {
          internalWrites: true,
          unsafeClient: "allow",
          allowBigInt: true,
        },
      });
      setAssetData(response);
    };
    id && fetchDetails(id);
  }, [id]);

  return (
    <div>
      {id}
      <pre>{assetData && JSON.stringify(assetData, null, 2)}</pre>
    </div>
  );
}

export default AtomicAssetDetails;
