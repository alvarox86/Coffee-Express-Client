import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function CreateProduct() {
  const { loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [origin, setOrigin] = useState({});
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    console.log("Enviando formulario");

    const newProduct = {
      name,
      description,
      imageUrl,
      origin: {
        country,
        region,
      },
      type,
      price,
      stock,
      createdBy: loggedUserId
    };

    const storedToken = localStorage.getItem("authToken");
    try {
      if (storedToken) {

        console.log(" Info del producto", newProduct);

        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/product`,
          newProduct,
          {
            headers: {
              Authorization: `Bearer ${storedToken} `,
            },
          }
        );
         console.log("Respuesta del servidor");
      }
      console.log("producto añadido correctamente");

      navigate("/products");
    } catch (error) {
      console.log(error);
      console.error("Error al crear producto");
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmitProduct}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Crear nuevo producto
        </Typography>

        <Stack spacing={3}>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            required
          />

          <TextField
            name="imageUrl"
            label="Image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              name="country"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              required
            />
            <TextField
              name="region"
              label="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              fullWidth
            />
          </Stack>

          <TextField
            name="type"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            required
          />

          <TextField
            name="price"
            label="Price (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
            required
          />

          <TextField
            name="stock"
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            inputProps={{ min: 0 }}
            fullWidth
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: "flex-end" }}
          >
            Create Product
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default CreateProduct;
