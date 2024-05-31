
import './Dashboard.css'

const Dashboard = () => {
  const [Products, setProducts] = useState([]);


  useEffect(() => {
    fetch("https://localhost:7248/api/products/GetAll", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in obtaining products");
        }
        return response.json();
      })
      .then((ProductsData) => {
        setProducts(ProductsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);



  const saveProductHandler = async (enteredProductData) => {
    const productDto = {
      id: 0,
      name: enteredProductData.name,
      description: enteredProductData.description,
      price: enteredProductData.price,
      stock: enteredProductData.stock,
      imageUrl: enteredProductData.imageUrl
    };
  }

  return (
    <></>
  )
}

export default Dashboard