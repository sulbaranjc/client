import React from "react";

import "../Styles/components/SocialMediaContact.css"

import { SocialIcon } from "react-social-icons";

class SocialMediaContact extends React.Component {
  render() {
    return (
      <section className="Social-media py-2 mx-4 ">
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <SocialIcon
              className=""
              url="https://www.youtube.com/user/EmmaHavokOficial"
              network="youtube"
              target="_blank"
            />
          </div>
          <div className="px-2">
            <SocialIcon
              className=""
              url="https://twitter.com/EmmaHavokRock"
              network="twitter"
              target="_blank"
              bgColor = "#2AFADF"
            />
          </div>
          <div className="px-2">
            <SocialIcon
              className=""
              url="https://www.facebook.com/EmmaHavok/"
              network="facebook"
              target="_blank"
            />
          </div>
          <div className="px-2">
            <SocialIcon
              className=""
              url="https://www.instagram.com/emmahavok/"
              network="instagram"
              target="_blank"
            />
          </div>
          <div className="px-2">
            <SocialIcon
              className=""
              url="https://api.whatsapp.com/send?phone=34617204209"
              network="whatsapp"
              target="_blank"
            />
          </div>
        </div>
      </section>
    );
  }
}
export default SocialMediaContact;
