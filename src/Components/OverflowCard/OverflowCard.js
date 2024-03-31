import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

export default function OverflowCard({ recipe }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        margin: "10px",
      }}
    >
      <CardOverflow>
        <Link to={`/singlerecipe/${recipe.id}`}>
          <AspectRatio ratio="2">
            <img src={recipe?.IMG} srcSet={recipe?.IMG} loading="lazy" alt="" />
          </AspectRatio>
        </Link>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{recipe?.Ime}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
      </CardOverflow>
    </Card>
  );
}
