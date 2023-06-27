import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Fab, Box } from "@mui/material";

import { toastr } from "react-redux-toastr";
import ContainerLoader from "../../components/loader/container-loader";
import { useGlobalContext } from "../../components/context/Global";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./dashboard.scss";

function QuickSightEmbed() {
  const { checktype } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urls, setUrl] = useState("");

  const { setsrc, src } = useGlobalContext();
  const request = {
    resource: "api/dashboard_links/quicksight",
    checktype,
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (error) => {
    setIsLoading(false);
    setError(error);
  };

  // useEffect(() => {
  //     const sendingDashboardName = async () => {
  //         let response;
  //         try {
  //             setIsLoading(true);
  //             response = await api.quicksight.getEmbeddedURL(request);
  //             if (response.data.data.status === 200) {
  //                 setUrl(response.data.data.EmbedUrl);
  //                 handleLoad();
  //             } else if (response.data.data.status === 400) {
  //                 handleLoad();
  //                 handleError(response.data.data.error.message);
  //             }
  //         } catch (error) {
  //             if (response.data !== 200) {
  //                 handleError(response.data.message);
  //                 handleLoad();
  //             } else {
  //                 handleError(error.message);
  //                 toastr.error(
  //                     'Error',
  //                     'An error occurred while loading the QuickSight report.',
  //                 );
  //             }
  //         }
  //     };
  //     sendingDashboardName();
  // }, [checktype]);
  let apps = [];
  useEffect(async () => {
    try {
      const response = await api.crud.getappname();

      response.data.data.rows.map((item) => {
        apps.push(item.app_name);
      });
      setsrc(apps);
    } catch (error) {}
  }, []);

  return (
    <>
      {/* {isLoading && <ContainerLoader></ContainerLoader>}
            {error && <div>{error}</div>}
            {!isLoading && !error && ( */}
      <div>
        <div className="main1">
          {src.map((item) => {
            return (
              <div className="insidemain" key={item}>
                <Box
                  sx={{
                    "& > :not(style)": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Fab color="primary" aria-label="add">
                    <div
                      onClick={() => {
                        setUrl(
                          "https://us-west-2.quicksight.aws.amazon.com/sn/accounts/919490798061/dashboards/bc3e3846-f2f5-49cd-8632-f4fac0f0df19?directory_alias=nv-agilisium"
                        );
                      }}
                      className={
                        item == "Youtube"
                          ? "ybt"
                          : item == "Facebook"
                          ? " fbt  "
                          : item == "Linkedin"
                          ? "lbt "
                          : item == "Spotify"
                          ? "sbt  "
                          : item == "Tiktok"
                          ? " tikbt "
                          : item == "Twitter"
                          ? " tbt  "
                          : item == "Instagram"
                          ? " ibt "
                          : " btn2  "
                      }
                    >
                      {item == "Youtube" ? (
                        <FaYoutube
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Facebook" ? (
                        <FaFacebook
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Instagram" ? (
                        <FaInstagram
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Spotify" ? (
                        <FaSpotify
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Twitter" ? (
                        <FaTwitter
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Linkedin" ? (
                        <FaLinkedinIn
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : item == "Tiktok" ? (
                        <FaTiktok
                          size={"2em"}
                          className="iconcs"
                          color="white"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Fab>
                </Box>
              </div>
            );
          })}
        </div>

        <iframe
          style={{
            height: "93vh",

            zIndex: 100,
            position: "fixed",
          }}
          className="iframe"
          src={urls}
          title="dashboard"
        />
      </div>
      {/* )} */}
    </>
  );
}

export default QuickSightEmbed;
