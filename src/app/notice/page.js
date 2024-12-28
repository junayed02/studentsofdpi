
import Container from "@/components/Container";
import Navbar from "@/components/navbar/Navbar";
import Notice from "@/components/notice";
const getNotice = async () => {
  const fetchRequest = await fetch(`http://${process.env.API_URL}/api/dashboardview`, {
    method: "GET",
    cache: "no-store",
  });
  const result = await fetchRequest.json();
  return result?.data;
};

const AllNotice = async () => {
  const allNotice = await getNotice();


  return (
    <div className="min-h-screen w-full bg-gray-200">
      <Container>
        <Navbar />
        <Notice allNotice={ allNotice} />
        
      </Container>
    </div>
  );
};

export default AllNotice;
