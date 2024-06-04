import "./css/product.css"
import {Link} from "react-router-dom"
const Products = () => {
    const products=[
        {
            "_id": "660269a57e9a53a02088520d",
            "name": "Maxi Dry Dog Food - Chicken and Liver (20kg)",
            "image": "https://www.buyautoparts.com/data/sm_images/CAT3559-Map1.jpg",
            "description": "Maxi chicken and liver adult is a complete food for adult dogs with regular activity. It contains all the essential ingredients to satisfy your dog's nutritional needs. It promotes healthy digestion and provides overall wellness to your dog.",
            "oldPrice": 2900,
            "newPrice": 2610,
            "status": false,
            "category_id": "6602681e705e0506eb614022",
            "__v": 0
        },
        {
            "_id": "66026a107e9a53a02088520f",
            "name": "Let's Bite Dry Dog Food for Active Adult",
            "image": "https://www.buyautoparts.com/data/sm_images/14-1004NEW.-map1.jpg",
            "description": "The best dry dog food is one that is complete, balanced, tasty, and wholesome. At Petsy, choose from healthy dry dog food brands with the best offers that fit your budget and dog’s health requirements. In addition to stocking top dry dog foods, at Petsy, you can also find the best dry dog foods for Shih Tzus, Labradors, Beagles, German Shepherds, and other breeds. When nutrition is one of the most crucial aspects of a dog’s health and well-being, why compromise?",
            "oldPrice": 1920,
            "newPrice": 1728,
            "status": false,
            "category_id": "6602681e705e0506eb614022",
            "__v": 0
        },
        {
            "_id": "66026c09744acd3776cb5b59",
            "name": "FOFOS Dog Toys - Woodplay Bone",
            "image": "https://www.buyautoparts.com/data/sm_images/14-sd1733new.-map1.jpg",
            "description": "Fofos woodplay bone is a dog chew toy that is great for teeth and gums. This toy comes as a set of two toys that can help massage your dog's gums and maintain good oral hygiene. This toy contains real wood and acts as a perfect furniture substitute. bone toys such as this allow your dog to chew, bite, fetch and play while getting the right amount of exercise and also make playtime interactive. This toy is ideal for small-medium dogs (5-20kg) of various breeds such as dachshund, pom, spitz, etc above 1 year of age. This toy is strong but not indestructible and is best suited for pet dogs that have moderate chewing and playing styles. Not recommended for aggressive chewers.",
            "oldPrice": 399,
            "newPrice": 359,
            "status": false,
            "category_id": "66026b1c7e9a53a020885213",
            "__v": 0
        },
        {
            "_id": "6602712a744acd3776cb5b67",
            "name": "Chuckit! Dog Toys - Kick Fetch Ball",
            "image": "https://www.buyautoparts.com/data/sm_images/14-20206F.-map1.jpg",
            "description": "Just the glimpse of a Chuckit! toy is enough to excite the 'fetch fanatic dog'. The bright colors signal an adventure with major playtime to come. Chuckit! performance toys are designed to take interACTION to the next level. These dynamic products are not intended to be solo play toys. Built on innovation and ergonomic design, Chuckit! has revolutionized the classic game of fetch. This enhanced experience encourages more fun play. Pioneering play since 1998, the human-animal bond is at the heart of every Chuckit! toy we make. Sharing the exhilaration elevates playtime to a new standard. Our toys are as fun for people as they are for pets, getting owners outdoors and inspiring a healthy, active lifestyle. Whether the dog likes toys that fly, float or tumble, we are proud to bring MORE WAYS TO PLAY! These interactive dog toys are fun for pets and pet parents, allowing pets to chase the Chuckit! kickball as pet parents punt, making them great dog toys for boredom.",
            "oldPrice": 2750,
            "newPrice": 2475,
            "status": false,
            "category_id": "66026b1c7e9a53a020885213",
            "__v": 0
        },
        {
            "_id": "66027431f9189158d417dd4a",
            "name": "Farmina Dry Food - N&D Quinoa Dog Weight Management Adult Med/Maxi (7kg)",
            "image": "https://www.buyautoparts.com/data/sm_images/AC-14-2185N-1100-Map1.jpg",
            "description": "​​​​​​​Farmina N&D Quinoa -Weight Management - Lamb & Broccoli Asparagus recipe is a complete food for dogs, which helps in weight management of the pets and further help in curing/preventing obesity. 94% of protein from animal origin, 0% artificial preservatives, 0% grains. Low level of FATS: Fats have the highest energetic density among nutrients. It is necessary to reduce the quantity of this highly caloric nutrient to reduce the total energetic density of the product. A high level of Crude fiber contributes to reducing the energetic density of the product. They increase the satiety feeling and reduce the absorption of caloric nutrients which remain trapped in the fiber matrix. Low Glycemic Index source of QUINOA and pea starch deliver glucose slowly to the blood after digestion. This leads to the pet having enough glucose in the blood for a longer time and do not want to feed more often. The slow release of sugar prevents Diabetes and being Overweight. Complete food for adult dogs. N&D Quinoa Weight Management is a complete dietetic food for dogs, suggested for the reduction of excessive body weight.",
            "oldPrice": 8500,
            "newPrice": 7500,
            "status": false,
            "category_id": "6602681e705e0506eb614022",
            "__v": 0
        },
    ]
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{"margin": "40px 33px 0px"}}>
    {products.map((product, index) => (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
            <Link to={`/product/${product._id}`} className="card-link">
                <div className="card h-100">
                    <div className="img-container">
                        <img src={product.image} className="card-img-top product-image" alt="..." />
                    </div>
                    <div className="card-body">
                        <div className="card-title">{product.name}</div>
                        <div className="cart-footer">
                            <div className="singleRow">
                                {/* <div className="oldPrice">₹{product.oldPrice}</div> */}
                                <div className="newprice ">₹{product.newPrice}</div>
                                <div className="cart"><i className="bi bi-cart"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    ))}
</div>
  )
}

export default Products
