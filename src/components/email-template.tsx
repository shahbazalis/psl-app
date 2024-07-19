
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

const EmailTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Preview>
        PSL Tampere 2024 Registration Confirmation.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src='/images/psl.png'
            width="170"
            height="50"
            alt="PSL Tampere Logo"
            style={logo}
          />
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Welcome to PSL Tampere! We are thrilled to have you on board for what
            promises to be an incredible season. Your registration is confirmed,
            and we look forward to an exciting journey together. Get ready for
            fantastic experiences, unforgettable moments, and a whole lot of
            fun. Thank you for joining us, and let us make this season amazing!
          </Text>
          <Text style={paragraph}>
            Best Regards,
            <br />
            The PSL Tampere Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};
