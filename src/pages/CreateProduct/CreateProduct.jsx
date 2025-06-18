import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";

function CreateProduct() {
  const { loggedUserId, rol } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (rol !== "vendor") {
      alert("Access denied.");
      navigate("/products");
    }
  }, [rol]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [origin, setOrigin] = useState({});
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
      createdBy: loggedUserId,
    };

    const storedToken = localStorage.getItem("authToken");
    try {
      if (storedToken) {
        console.log(" Info del producto", newProduct);

        await service.post(`/product`, newProduct, {
          headers: {
            Authorization: `Bearer ${storedToken} `,
          },
        });
      }

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post(`/upload`, uploadData);

      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
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
        Submit your product
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
          name="image"
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
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
            required
          />
        </Stack>

        <TextField
          select
          name="type"
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          required
        >
          <MenuItem value="beans">Beans</MenuItem>
          <MenuItem value="capsule">Capsule</MenuItem>
          <MenuItem value="ground">Ground</MenuItem>
        </TextField>

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
  );
}

export default CreateProduct;
