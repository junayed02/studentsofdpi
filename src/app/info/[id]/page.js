import NoData from "@/components/nodata";
import ViewPage from "@/components/view/ViewPage";
import notFound from "@/app/not-found";

const myData = async (currentId) => {
  const fetchRequest = await fetch(
    `${process.env.API_URL}/api/view?id=${currentId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const result = await fetchRequest.json();
  return result?.data;
};

const page = async ({ params }) => {
  const info = await myData(params?.id);
  if (!info) {
    return notFound();
  }
  if (info[0]?.Name) {
    return (
      <div>
        <ViewPage details={info[0]} myId={params?.id} />
      </div>
    );
  } else {
    return (
      <div>
        <NoData myId={params?.id} />
      </div>
    );
  }
};

export default page;
