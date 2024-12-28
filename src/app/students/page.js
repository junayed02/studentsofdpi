import Container from "@/components/Container";
import Students from "@/components/view/Students";

const fullViewFetch = async () => {
  const fetchRequest = await fetch(`http://${process.env.API_URL}/api/view`, {
    method: "GET",
    cache: "no-store",
  });
  const result = await fetchRequest.json();
  return result?.data
};

const page = async () => {
  const studentsInfo = await fullViewFetch();

  return (
    <div className="min-h-screen min-w-[768px] bg-gray-200">
      <Container>
        <Students studentsInfo={studentsInfo} />
      </Container>
    </div>
  );
};

export default page;
