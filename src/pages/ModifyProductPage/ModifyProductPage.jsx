import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { AuthContext } from "../../context/auth.context";

function ModifyProductPage() {
  const { productId } = useParams();
  const { loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getData = async () => {
      const storedToken = localStorage.getItem("authToken");

      try {
        if (storedToken) {
          const response = await service.get(`/product/${productId}/modify`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setName(response.data.name);
          setDescription(response.data.description);
          setImageUrl(response.data.imageUrl);
          setCountry(response.data.origin.country);
          setRegion(response.data.origin.region);
          setType(response.data.type);
          setPrice(response.data.price);
          setStock(response.data.stock);
        }
      } catch (error) {
        if (error.response.status) {
          alert("Access denied.");
          navigate("/products");
        } else {
          console.log(error);
        }
      }
    };

    getData();
  }, [productId]);

  const handleModifyProduct = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const updateProduct = {
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

    try {
      await service.put(`/product/${productId}`, updateProduct, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      navigate(`/products/${productId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const storedToken = localStorage.getItem("authToken");

    try {
      await service.delete(`product/${productId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      
      navigate("/products", { state: { updated: true } });
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
      onSubmit={handleModifyProduct}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: "#fff",
        marginBottom: "60px",
        marginTop: "60px"
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Modify product
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
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
          fullWidth
        >
          {isUploading ? <h3>... uploading image</h3> : null}
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt="img" width={200} />
            </div>
          ) : null}
        </TextField>

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
          fullWidth
          required
        />
        <TextField
          name="stock"
          label="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          fullWidth
          required
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#D9A689",
              color: "white",
              "&:hover": {
                backgroundColor: "#6c3a2f",
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProduct}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#6c3a2f",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default ModifyProductPage;
