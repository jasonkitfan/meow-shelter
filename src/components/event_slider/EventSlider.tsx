import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import slider_1 from "./image/slider_1.png";
import slider_2 from "./image/slider_2.jpg";
import slider_3 from "./image/slider_3.jpg";
import slider_4 from "./image/slider_4.jpg";
import slider_5 from "./image/slider_5.jpg";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "1",
    imgPath: slider_1,
  },
  {
    label: "2",
    imgPath: slider_2,
  },
  {
    label: "3",
    imgPath: slider_3,
  },
  {
    label: "4",
    imgPath: slider_4,
  },
  {
    label: "5",
    imgPath: slider_5,
  },
];

function EventSlider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const [isHovering, setIsHovering] = React.useState(false); // Add state to track whether the mouse is hovering over the image

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleMouseEnter = () => {
    setIsHovering(true); // Set the isHovering state to true when the mouse enters the image
  };

  const handleMouseLeave = () => {
    setIsHovering(false); // Set the isHovering state to false when the mouse leaves the image
  };

  return (
    <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 4,
          textAlign: "center",
          paddingBottom: { lg: "3rem", md: "1rem" },
        }}
      >
        Events
      </Typography>
      <Box
        sx={{
          maxWidth: "100%",
          flexGrow: 1,
          paddingLeft: { xs: "1rem", md: "5rem", xl: "20rem" },
          paddingRight: { xs: "1rem", md: "5rem", xl: "20rem" },
        }}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000}
          autoplay={!isHovering} // Pause the autoplay only when the mouse is hovering over the image
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: "40rem",
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: ".5rem",
                    boxShadow: "0px 5px 20px rgba(0,0,0,0.05)",
                    objectFit: "contain",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                  onMouseEnter={handleMouseEnter} // Add onMouseEnter and onMouseLeave event handlers to the image
                  onMouseLeave={handleMouseLeave}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </div>
  );
}

export default EventSlider;
