
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function AtomicAssetCard({
    txId,
    index,
    arweaveData,
}) {

    const router = useNavigate();
    
  return (
    <Card
      shadow="sm"
      key={index}
      isPressable
      onPress={() => router(`/${txId}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={`Transaction ${txId}`}
          className="w-full object-cover h-[300px] object-top"
          src={`https://arweave.net/${txId}`}
        />
      </CardBody>
      <CardFooter className="text-small items-start flex-col text-left">
        <h3 className="text-lg text-left">
          {arweaveData.detailsMap.get(txId)?.title}
        </h3>
        <p className="text-default-500 line-clamp-3">
          {arweaveData.detailsMap.get(txId)?.description}
        </p>
      </CardFooter>
    </Card>
  );
}

export default AtomicAssetCard
