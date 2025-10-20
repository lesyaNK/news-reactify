import { Button } from "@mui/material";
import styles from "./styles.module.css";

const Categories = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => setSelectedCategory(category)}
          variant={selectedCategory === category ? "contained" : "outlined"}
          color={selectedCategory === category ? "primary" : "inherit"}
          sx={{
            boxShadow: "none",
            textTransform: "none",
            borderRadius: "32px",
            padding: "8px 16px",
            fontSize: "0.9rem",
            flexShrink: 0,
            backgroundColor:
              selectedCategory === category ? "#e7e7ff" : "#f2f4f5",
            color:
              selectedCategory === category ? "#6b4eff" : "rgba(0,0,0,0.87)",
            border: "none",
            "&:hover": {
              backgroundColor:
                selectedCategory === category ? "#d9d5ff" : "#e4e6e7",
            },
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
