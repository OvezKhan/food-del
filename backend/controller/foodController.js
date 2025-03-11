import { foodModel } from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food  = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image:image_filename,
        });

        try {
            await food.save();
            res.json({success:true , message:"Food Added"})
        } catch (error) {
            console.log(error);
            res.json({success:false , message:"Error"});
        }
}


// add Food List
const foodList = async(req,res) => {
      try {
        const foods = await foodModel.find({});
          res.json({success:true ,data:foods});
      }
      catch(error){
        console.log(error);
        res.json({success:false ,message:"Error"});

      }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Check if the food item exists
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        //  Only delete the image if it exists
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting image:", err);
            });
        }

        //  Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log("Error:", error);
        res.json({ success: false, message: "Error deleting food item" });
    }
};


export {addFood,foodList,removeFood}