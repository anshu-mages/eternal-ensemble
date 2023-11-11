import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
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
  const { id } = useParams<{ id: string }>();
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
    <div className="container mx-auto">
      <Button color="success" className="mt-5 " onClick={
        ()=>{
          router("/")
        }
      }>
        <div className="flex items-center gap-2">
          <IoArrowBackOutline /> Back to Home
        </div>
      </Button>
      <div className="grid grid-cols-3 mt-5 gap-4 ">
        <img
          alt="Woman listing to music"
          className="  object-cover h-[600px] w-full object-top rounded-xl"
          src={`https://arweave.net/${id}`}
        />

        <div className=" col-span-2">
          <Card className="border-none">
            <CardBody>
              <h1 className="text-2xl font-bold text-secondary-800 capitalize">
                {data?.Title}
              </h1>
              <p className="text-default-500 mt-1 text-lg">
                {data?.Description}
              </p>
              <div className=" flex gap-2 mt-2">
                {data &&
                  extractTopicKeyValuePairs(data).map((pair) => (
                    <Chip color="secondary">{pair.value}</Chip>
                  ))}
              </div>
            </CardBody>
          </Card>
          <Card className="border-none mt-5">
            <CardHeader className="flex flex-col items-start gap-3">
              {data?.Creator && (
                <Chip color="default">Created By - {data?.Creator}</Chip>
              )}
              {data && Object.keys(data).includes("Init-State") && (
                <Chip color="default">
                  First Owner - {JSON.parse(data["Init-State"]).firstOwner}
                </Chip>
              )}
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AssetPage;
