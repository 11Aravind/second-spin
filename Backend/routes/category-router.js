import express from "express"
import multer from "multer";
import upload from "../middlewares/mutler-middleware.js";
import Category from "../modules/Category.js"
import Subcategory from "../modules/Subcategory.js";
const categoryRoute = express.Router()
categoryRoute.get("/", async (req, res) => {
    let categoryData;
    try {
        categoryData = await Category.find();
        res.status(200).json({ "message": "success", "status": "success", "payload": categoryData })
    } catch (err) {
        res.send(err)
    }
});
categoryRoute.get("/subcategory", async (req, res) => {
    let categoryData;
    try {
        categoryData = await Subcategory.find();
        res.status(200).json({ "message": "success", "status": "success", "payload": categoryData })
    } catch (err) {
        res.send(err)
    }
});
categoryRoute.post("/save", upload.single("image"), async (req, res) => {
    const { vechicle, spairPatsType, partsName } = req.body;
    const image = req.file.filename;
    let flag;
    try {
        const data = new Category({
            vechicle,
            spairPatsType,
            image,
            partsName
        })
        // console.log(data)
        flag = await data.save()
        if (flag)
            res.status(200).json({ "message": "category was added", "status": "success" })
        else
            res.status(200).json({ "message": "category was not added", "status": "failed" })
    } catch (err) {
        res.status(401).json({ "message": `some thing went wrong ${err}`, "status": "failed" })
    }
});
categoryRoute.post("/subcategory/store", upload.single("image"), async (req, res) => {
    const { category_id, Subcat_name } = req.body;
    const image = req.file.filename;

    const data = new Subcategory({
        category_id,
        Subcat_name,
        image,
    })
    let flag;
    try {
        flag = await data.save()
        if (flag)
            res.status(200).json({ "message": "Subcategory was added", "status": "success" })
        else
            res.status(200).json({ "message": "Subcategory was not added", "status": "failed" })
    } catch (err) {
        res.status(401).json({ "message": `some thing went wrong ${err}`, "status": "failed" })
    }
});
categoryRoute.delete('/:category_id', async (req, res) => {
    const category_id = req.params.category_id;
    let deleteFlag;
    try {
        deleteFlag = await Category.findByIdAndDelete(category_id);

    } catch (err) {
        return res.status(500).send({ status: "failed", message: 'deletion failed', error: err, id: category_id });
    }
    if (!deleteFlag) {
        return res.status(404).json({ status: "failed", message: 'Category not found', id: category_id });
    }
    return res.status(200).json({ status: "success", message: 'Category deleted successfully', deleteFlag });

});



// updation content
// categoryRoute.post('/update', upload.single('image'), async (req, res) => {
//     const { vehicle, spairPatsType, partsName } = req.body;
//     let image;
//     // Check if an image file is uploaded
//     if (req.file) {
//       image = req.file.filename;
//     }
//     try {
//       // Find the category and update it
//       const category = await Category.findById(req.body.categoryId); // assuming categoryId is passed in the request
//       if (category) {
//         category.vehicle = vehicle;
//         category.spairPatsType = spairPatsType;
//         if (image) {
//           category.image = image;
//         }
//         category.partsName = partsName;

//         await category.save();
//         res.status(200).json({ message: 'Category was updated', status: 'success' });
//       } else {
//         res.status(404).json({ message: 'Category not found', status: 'failed' });
//       }
//     } catch (err) {
//       res.status(500).json({ message: `Something went wrong: ${err}`, status: 'failed' });
//     }
//   });
categoryRoute.post('/update', upload.single('image'), async (req, res) => {
    const { categoryId, vechicle, spairPatsType, partsName } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    }
    try {
        const category = await Category.findById(categoryId);
        if (category) {
            category.vechicle = vechicle || category.vechicle;
            category.spairPatsType = spairPatsType || category.spairPatsType;
            category.partsName = partsName || category.partsName;

            if (image) {
                category.image = image;
            }

            await category.save();
            res.status(200).json({ message: 'Category was updated', status: 'success' });
        } else {
            res.status(404).json({ message: 'Category not found', status: 'failed' });
        }
    } catch (err) {
        res.status(500).json({ message: `Something went wrong: ${err.message}`, status: 'failed' });
    }
});

categoryRoute.put("/subcategory/update/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params; // Subcategory ID from URL parameter
    const { category_id, Subcat_name } = req.body;
    let image;

    // Check if an image file was uploaded
    if (req.file) {
        image = req.file.filename;
    }

    try {
        // Find the existing subcategory by ID
        const subcategory = await Subcategory.findById(id);

        if (!subcategory) {
            return res.status(404).json({ "message": "Subcategory not found", "status": "failed" });
        }

        // Update fields
        subcategory.category_id = category_id || subcategory.category_id;
        subcategory.Subcat_name = Subcat_name || subcategory.Subcat_name;
        if (image) {
            subcategory.image = image; // Update image if a new one is provided
        }

        // Save the updated subcategory
        const updatedSubcategory = await subcategory.save();

        if (updatedSubcategory) {
            res.status(200).json({ "message": "Subcategory was updated", "status": "success" });
        } else {
            res.status(500).json({ "message": "Subcategory update failed", "status": "failed" });
        }
    } catch (err) {
        res.status(500).json({ "message": `Something went wrong: ${err}`, "status": "failed" });
    }
});

export default categoryRoute;