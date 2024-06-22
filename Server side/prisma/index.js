import {PrismaClient} from "@prisma/client"
import express from "express"
import cors from "cors"
import multer from "multer"
import path from "path"
 const app=express()
 const prisma=new PrismaClient()

app.use(express.json());
app.use(cors())

app.post("/add_users",async(req,res)=>{
  try{
      const newUser=await prisma.user.create({
         data:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         },
      });
      return res.status(200).json({message:"User added successfully",data:newUser});
   }catch(err){
      
  
      return res.status(500).json({error:"Failed to add new user"})
   }
});



app.get("/fetch_users",async(req,res)=>{
  try {
   const users=await prisma.user.findMany({
      where:{is_deleted:false},
   });
   return res.json(users)
   
   
  } catch (error) {
   console.log(error)
   return res.json({message:"error of fetching users",error})
  }
});
//update user
app.put("/user/:id",async(req,res)=>{
   try {
      const userId=parseInt(req.body.id);
      const updatedUser=await prisma.user.update({
         where:{id:userId},
         data:{
            name: req.body.name,
        email: req.body.email,
        password: req.body.password,
         }
      });
      return res.status(200).json({ message: 'Updating successfully', data: updatedUser });
      
   } catch (error) {
      console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error updating user' });
   }
})

//delete user
app.delete("/user/:id",async(req,res)=>{
   try {
      const userId=await parseInt(req.body.id);
      const deleteUser=await prisma.user.update({
         where:{id:userId},
         data:{is_deleted:true}
      });
      if(deleteUser.is_deleted){
         return res.status(200).json({message:'User deleted successfully'})
      
      }
      else
      {
         return res.status(404).json({ message: 'User not found' });      }
      
   } catch (error) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user' });
   }
});
//upload image
const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
   cb(null,'images')
   },
   filename:(req,file,cb)=>{
   cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
   }
   });
   const upload=multer({
   storage:storage
   });
   app.use('/images', express.static('images'));
// Add products
app.post('/add_products', upload.single('image'), async (req, res) => {
   try {
     const newProduct = await prisma.products.create({
       data: {
         product_name: req.body.product_name,
         description: req.body.description,
         price: req.body.price,
         image_url: req.file.filename,
       },
     });
     res.status(200).json({ message: 'Product added successfully', data: newProduct });
   } catch (err) {
     console.error('Error adding product:', err);
     return res.status(500).json({ error: 'Failed to add product' });
   }
 });
 
 // Update products
 app.put('/update_products/:id', upload.single('image'), async (req, res) => {
   try {
     const prodId = parseInt(req.params.id);
     const updatedProduct = await prisma.products.update({
       where: { id: prodId },
       data: {
         product_name: req.body.product_name,
         description: req.body.description,
         price: req.body.price,
         image_url: req.file.filename,
       },
     });
     res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
   } catch (err) {
     console.error('Error updating product:', err);
     return res.status(500).json({ error: 'Failed to update product' });
   }
 });
 
 // Fetch products
 app.get('/fetch_products', async (req, res) => {
   try {
     const products = await prisma.products.findMany({
       where: { is_deleted: false },
     });
     return res.json(products);
   } catch (err) {
     console.error('Error fetching products:', err);
     return res.status(500).json({ message: 'Error fetching products' });
   }
 });
 
 // Delete product
 app.delete('/products/:id', async (req, res) => {
   try {
     const prodId = parseInt(req.params.id);
     const deletedProduct = await prisma.products.update({
       where: { id: prodId },
       data: { is_deleted: true },
     });
     if (deletedProduct.is_deleted) {
       return res.json({ message: 'Product deleted successfully' });
     } else {
       return res.status(404).json({ message: 'Product not found' });
     }
   } catch (err) {
     console.error('Error deleting product:', err);
     return res.status(500).json({ message: 'Error deleting product' });
   }
 });


 app.listen(8800,()=>{
    console.log("sever running")
 })