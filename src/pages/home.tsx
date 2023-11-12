import { useEffect, useState } from "react";
import Cards from "../components/cards";
import { queryGQL } from "arweavekit";
import { Select, SelectItem } from "@nextui-org/react";

function Home() {
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const fetchArweaveTransactionDetails = async () => {
    const gqlQuery = `
      query {
        transactions(
          tags: [{ name: "Data-Protocol", values: ["Collection"] }],
          first: 100,
          block: { min: 1242062 }
        ) {
          edges {
            node {
              id
              tags {
                name
                value
              }
            }
          }
        }
      }
    `;

    try {
      const response = await queryGQL(gqlQuery, {
        gateway: "arweave.net",
        filters: {},
      });
      console.log(response);
      const fetchedCollections = response.data.transactions.edges.map(
        (edge) => {
          const titleTag = edge.node.tags.find((tag) => tag.name === "Title");
          const descriptionTag = edge.node.tags.find(
            (tag) => tag.name === "Description"
          );
          return {
            id: edge.node.id,
            title: titleTag ? titleTag.value : "",
            description: descriptionTag ? descriptionTag.value : "",
          };
        }
      );
      setCollections(fetchedCollections);
      if (fetchedCollections.length > 0) {
        setSelectedCollectionId(fetchedCollections[5].id);
      }
    } catch (error) {
      console.error("Error fetching Arweave transaction details:", error);
      // Optionally update the UI to indicate an error to the user
    }
  };

  useEffect(() => {
    fetchArweaveTransactionDetails();
  }, []);

  return (
    <div className="container mx-auto">
      {collections && collections.length > 0 && (
        <>
          <Select
            label="Select A Collection"
            className="max-w-sm"
            items={collections}
            value={
              selectedCollectionId
                ? collections.find(
                    (collection) => collection.id === selectedCollectionId
                  ).title
                : collections[0].title
            }
            placeholder={
              selectedCollectionId
                ? collections.find(
                    (collection) => collection.id === selectedCollectionId
                  ).title
                : collections[0].title
            }
            onChange={(e) => setSelectedCollectionId(e.target.value)}
          >
            {(collection) => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.title}
              </SelectItem>
            )}
            {/* {collections.map((collection) => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.title}
              </SelectItem>
            ))} */}
          </Select>
          <h1 className="my-5 text-2xl capitalize">
            {selectedCollectionId
              ? collections.find(
                  (collection) => collection.id === selectedCollectionId
                ).title
              : collections[0].title}
          </h1>
          <p className="-mt-4">
            {selectedCollectionId
              ? collections.find(
                  (collection) => collection.id === selectedCollectionId
                ).description
              : collections[0].description}
          </p>
          <Cards collectionId={selectedCollectionId} />
        </>
      )}
    </div>
  );
}

export default Home;
