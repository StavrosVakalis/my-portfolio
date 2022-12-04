import React from "react";
import Button from "../Button";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useId } from "react";
import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  const id = useId();
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {
        yourData.contact.email &&
        (<Button key={id}>
          <AlternateEmailIcon onClick={() => window.open(`mailto:${yourData.contact.email}`)} />
        </Button>)
      }
      {yourData.socials.map((social, index) => {
        if (social.title.includes("LinkedIn")) {
          return <Button key={social.id}>
            <LinkedInIcon onClick={() => window.open(social.link)} />
          </Button>
        }
        if (social.title.includes("Google")) {
          return <Button key={social.id}>
            <GoogleIcon onClick={() => window.open(social.link)} />
          </Button>
        }
        return (
          <Button key={index} onClick={() => window.open(social.link)}>
            {social.title}
          </Button>
        )
      })}

    </div>
  );
};

export default Socials;
