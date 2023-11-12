import { Button,  Chip } from "@nextui-org/react";
import { queryGQL } from "arweavekit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";


export interface Tag {
  name: string;
  value: string;
}
export interface Data {
  size: string;
  type: string;
}
export interface RootObject {
  tags: Tag[];
  data: Data;
}

function AssetPage() {
  const { id } = useParams<{
    id: string;
    collectionId: string;
  }>();
  const [assetData, setAssetData] = useState<RootObject>(null);
  const [data, setData] = useState(null);

  const router = useNavigate();
  async function fetchArweaveTransactionDetails(txId: string) {
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

  const convertToObject = (tags: Tag[]) => {
    const data = {};
    tags.forEach((tag) => {
      data[tag.name] = tag.value;
    });
    return data;
  };

  // useEffect(() => {
  //   async function fetchPersonDetails(publicAddress: string) {
  //     const gqlQuery = `
  //   query {
  //     transactions(owners: ["${publicAddress}"]) {
  //       edges {
  //         node {
  //           id
  //           tags {
  //             name
  //             value
  //           }

  //         }
  //       }
  //     }
  //   }
  // `;

  //     try {
  //       const response = await queryGQL(gqlQuery, {
  //         gateway: "arweave.net",
  //         filters: {},
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching details from Arweave:", error);
  //       return null;
  //     }
  //   }
  //   //  if(data && data.Creator){
  //   //     fetchPersonDetails(data.Creator).then((personDetails) => {
  //   //       console.log(personDetails);
  //   //     });
  //   //  }
  // }, [data]);

  useEffect(() => {
    async function fetchAssetData() {
      const transactionDetails = await fetchArweaveTransactionDetails(id);
      console.log(transactionDetails);
      setAssetData(transactionDetails as unknown as RootObject);
    }
    fetchAssetData();
  }, [id]);

  useEffect(() => {
    if (assetData) {
      const data = convertToObject(assetData.tags);
      setData(data);
    }
  }, [assetData]);

  interface TopicKeyValuePair {
    key: string;
    value: string;
  }

  function extractTopicKeyValuePairs(data) {
    const topicKeyValuePairs: TopicKeyValuePair[] = [];

    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        key.startsWith("topic:")
      ) {
        topicKeyValuePairs.push({ key, value: data[key] });
      }
    }

    return topicKeyValuePairs;
  }

  return (
    <div className="container mx-auto ">
      <Button
        color="success"
        className="mt-5 "
        onClick={() => {
          router("/");
        }}
      >
        <div className="flex items-center gap-2">
          <IoArrowBackOutline /> Back to Home
        </div>
      </Button>
      <div className="flex items-center mt-16">
        <div className="grid grid-cols-5 mt-5 gap-4 items-center ">
          <div className=" col-span-3">
            <h1 className="text-2xl font-bold text-secondary-800 capitalize">
              {data?.Title}
            </h1>
            <p className="text-default-500 mt-1 text-lg">{data?.Description}</p>
            <div className=" flex gap-2 mt-2">
              {data &&
                extractTopicKeyValuePairs(data).map((pair, i) => (
                  <Chip color="secondary" key={i}>
                    {pair.value}
                  </Chip>
                ))}
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-2 mt-5">
                {data?.Creator && (
                  <Button
                    color="default"
                    onClick={() => {
                      //open in new tab
                      window.open(
                        `https://viewblock.io/arweave/address/${data?.Creator}`,
                        "_blank"
                      );
                    }}
                  >
                    Created By - {data?.Creator}
                  </Button>
                )}
                {data &&
                  Object.keys(data).includes("Init-State") &&
                  data["Init-State"]?.firstOwner && (
                    <Button
                      color="default"
                      onClick={() => {
                        //open in new tab
                        window.open(
                          `https://viewblock.io/arweave/address/${
                            JSON.parse(data["Init-State"]).firstOwner
                          }`,
                          "_blank"
                        );
                      }}
                    >
                      First Owner - {JSON.parse(data["Init-State"]).firstOwner}
                    </Button>
                  )}
                {data && (
                  <Button
                    color="success"
                    onClick={() => {
                      //open in new tab
                      window.open(
                        `https://viewblock.io/arweave/tx/${id}`,
                        "_blank"
                      );
                    }}
                  >
                    License - {data["License"]}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <img
            alt="Woman listing to music"
            className="col-span-2  object-cover h-[600px] w-full object-top rounded-xl"
            src={`https://arweave.net/${id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default AssetPage;
