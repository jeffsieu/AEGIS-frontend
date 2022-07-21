import TitledContainer from '@components/general/titled-container';
import {
  Button,
  Box,
  Card,
  Step,
  StepContent,
  Stepper,
  Typography,
  Stack,
  StepButton,
  Tab,
  Tabs,
  useTheme,
  CardMedia,
} from '@mui/material';
import React, { ImgHTMLAttributes, useState } from 'react';
import { Guide, GuideStep } from '@typing/guide';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export type VerticalStepperProps = {
  steps: GuideStep[];
};

export function VerticalStepper(props: VerticalStepperProps) {
  const { steps } = props;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepButton
            onClick={() => setActiveStep(index)}
            optional={
              step.optional ? (
                <Typography variant="overline">Optional</Typography>
              ) : undefined
            }
          >
            <b>{step.label}</b>
          </StepButton>
          <StepContent>
            <Box mt={2}>{step.content}</Box>
            <Box mt={2} display="flex" gap={1}>
              {index > 0 && (
                <Button onClick={() => setActiveStep(index - 1)}>Back</Button>
              )}
              {index < steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(index + 1)}
                >
                  Next
                </Button>
              )}
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

type GuideImageProps = {
  src: ImgHTMLAttributes<HTMLImageElement>['src'];
  alt: ImgHTMLAttributes<HTMLImageElement>['alt'];
};

export function GuideImage(props: GuideImageProps) {
  const theme = useTheme();

  return (
    <Stack marginY={2}>
      <Box display="flex">
        <Card variant="outlined">
          <CardMedia
            component="img"
            src={props.src}
            alt={props.alt}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '50vh',
            }}
          />
        </Card>
      </Box>
      <Typography variant="caption" color={theme.palette.text.secondary}>
        {props.alt}
      </Typography>
    </Stack>
  );
}

export type GuidePageProps = {
  guides: Guide[];
};

export default function GuidePage(props: GuidePageProps) {
  const { guides } = props;

  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <TitledContainer title="User guide">
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 2 }}
        position="sticky"
        top="128px" // Some magic number to make the Tabs sticky, but I don't even care anymore
        bgcolor={theme.palette.background.paper}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {guides.map((guide, index) => (
            <Tab label={guide.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {guides.map((guide, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          <Box marginY={2}>
            <Typography variant="h5" gutterBottom>
              {guide.title}
            </Typography>
          </Box>
          <VerticalStepper steps={guide.steps} />
        </TabPanel>
      ))}
    </TitledContainer>
  );
}
