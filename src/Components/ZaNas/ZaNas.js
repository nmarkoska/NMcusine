import React from "react";
import { Box, Container, Typography } from "@mui/material";

function ZaNas() {
  return (
    <Container
      sx={{ marginTop: "30px", marginBottom: "30px", paddingTop: "125px" }}
    >
      <Box display="flex" justifyContent="space-evenly" maxWidth="1200px">
        <Box>
          <Box sx={{ paddingTop: "px" }} maxWidth="400px">
            <h1>За нас</h1>
            <Typography style={{ textAlign: 'justify' }}>
              Добредојдовте во светот на највкусните традиционални рецепти! Овде
              ќе откриете вистинскo богатство на вкусови, мириси и традиции кои
              се пренесени од колено на колено. Преку разнообразни и освежувачки
              специјалитети, нашата колекција на традиционални рецепти ќе ве
              навлече во свет на гурмански ужитоци. Секој рецепт е исполнет со
              љубов и грижа, пренесени од нашите предци, и нуди можност за
              истражување и креирање на вкусни авантури во вашата кујна. Да ви
              биде слатко и уживајте во вкусот на наследството што го носиме во
              секој залез на чинијата!
            </Typography>
          </Box>
        </Box>

        <Box>
          <img
            src="https://arhiva.artkujna.mk/wp-content/uploads/2021/06/tetratka-so-recepti.jpg"
            width="570"
            height="380"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default ZaNas;
