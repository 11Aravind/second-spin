
//   = () => {

    import { useState ,useEffect,useRef} from "react";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import axios from "axios"
    export const AddSubcategory = () => {
        const mainCategory = useRef("");
        const Subcat_name = useRef("");
        const [image, setImage] = useState("");
        const [errors, setErrors] = useState({
          mainCategory: "",
          Subcat_name: "",
          image: "",
        });
      
        const [categorys, setCaregory] = useState([]);
      
        useEffect(() => {
          axios.get("http://localhost:5001/api/category/")
            .then((res) => {
              setCaregory(res.data.payload);
            })
            .catch((err) => console.log(err));
        }, []);
      
        const resetValue = () => {
          mainCategory.current.value = "--Select--";
          Subcat_name.current.value = "";
          setImage("");
          setErrors({
            mainCategory: "",
            Subcat_name: "",
            image: "",
          });
        };
      
        const saveSubcategory = () => {
          let isValid = true;
          const newErrors = {
            mainCategory: "",
            Subcat_name: "",
            image: "",
          };
      
          if (mainCategory.current.value === "--Select--") {
            newErrors.mainCategory = "Please select a main category";
            isValid = false;
          }
      
          if (!Subcat_name.current.value) {
            newErrors.Subcat_name = "Please enter a subcategory name";
            isValid = false;
          }
      
          if (!image) {
            newErrors.image = "Please select an image";
            isValid = false;
          }
      
          setErrors(newErrors);
      
          if (!isValid) {
            setTimeout(() => {
              setErrors({
                mainCategory: "",
                Subcat_name: "",
                image: "",
              });
            }, 3000);
            return;
          }
      
          const data = new FormData();
          data.append("category_id", mainCategory.current.value);
          data.append("Subcat_name", Subcat_name.current.value);
          data.append("image", image);
      
          axios
            .post("http://localhost:5001/api/category/subcategory/store", data)
            .then((res) => {
              if (res.data.status === "success") {
                toast.success(res.data.message);
                resetValue();
              } else {
                toast.error(res.data.message);
              }
            })
            .catch((err) => console.log(`failed ${err}`));
        };
      
        return (
          <div className="content-div">
            <ToastContainer />
            <div className="card-header">
              <div className="card-headding gradient-text ">Add Subcategory</div>
            </div>
            <div className="table-container">
              <div className="row" style={{ padding: "37px" }}>
                <div className="col">
                  <label htmlFor="maincat">Main category</label>
                  <select
                    className="form-select"
                    id="maincat"
                    aria-label="Default select example"
                    ref={mainCategory}
                  >
                    <option defaultValue="Select" selected>--Select--</option>
                    {categorys.map((category, id) => (
                      <option key={id} value={category._id}>
                        {category.vechicle}, {category.spairPatsType}, {category.partsName}
                      </option>
                    ))}
                  </select>
                  <small style={{ color: "red" }}>{errors.mainCategory}</small>
                </div>
                <div className="col">
                  <label htmlFor="category">Subcategory name</label>
                  <input
                    type="text"
                    id="category"
                    ref={Subcat_name}
                    className="form-control"
                  />
                  <small style={{ color: "red" }}>{errors.Subcat_name}</small>
                </div>
                <div className="col">
                  <label htmlFor="category">Image</label>
                  <input
                    type="file"
                    id="category"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
                  />
                  <small style={{ color: "red" }}>{errors.image}</small>
                </div>
              </div>
              <div className="row" style={{ padding: "16px 37px" }}>
                <button className="btn btn-primary btn-color" onClick={saveSubcategory}>
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      };