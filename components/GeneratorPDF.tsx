import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { RaportImage } from "@/types/types";

interface ConstatareSorinProps {
  data: any;
  imagini: RaportImage[];
}

const constatariSorin = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "93%",
    width: "90%",
    padding: "20px",
    gap: "10px",
    border: "1px",
    borderColor: "green",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
    fontSize: "12px",
    color: "black",
  },
  notBold: {
    fontFamily: "Helvetica",
    fontSize: "12px",
    color: "black",
  },
  imageFlexBox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "100%",
  },
  displayedImage: {
    border: "2px",
    borderColor: "black",
    borderStyle: "solid",
    objectFit: "cover",
    objectPosition: "center",
    width: "160px",
    height: "280px",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
    height: "auto",
  },
  daminaLogo: {
    objectFit: "contain",
    width: "80px",
  },
  mainTitle: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: "16px",
  },
  mainTitlePoze: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: "16px",
    textAlign: "center",
  },
  verticalFlexContainer: {
    display: "flex",
    flexDirection: "column",
  },
  verticalFlexContainerRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mainVerticalFlexContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    gap: "15px",
    width: "100%",
  },
  smallText: {
    fontSize: "10px",
  },
  smallerText: {
    color: "black",
    fontSize: "11px",
    fontFamily: "Helvetica",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "10px",
    fontFamily: "Helvetica-Oblique",
    opacity: 0.5,
  },
  lineContainer: {
    width: "100%",
    height: "1px",
    border: "1px",
    borderColor: "green",
  },
  mainTitleBoxes: {
    fontSize: "11px",
    fontFamily: "Helvetica-Bold",
    color: "green",
  },
  flexJustifyBetween: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  detaliiText: {
    color: "black",
    fontSize: "11px",
    fontFamily: "Helvetica",
    lineHeight: "1.5px",
  },
});

export const ConstatareSorin = ({ data, imagini }: ConstatareSorinProps) => {
  // console.log(imagini); // check data
  return (
    <>
      <Document>
        <Page style={constatariSorin.pageBody} size="A4" wrap>
          <View style={constatariSorin.mainContainer}>
            <View style={constatariSorin.flexContainer}>
              <View style={constatariSorin.verticalFlexContainer}>
                <Text style={constatariSorin.mainTitle}>
                  CONSTATARE MENTENANTA CLADIRI
                </Text>
                <Text style={constatariSorin.smallText}>
                  DAMINA SOLUTIONS SRL
                </Text>
              </View>
              <Image
                src={{
                  uri: "/DAMINA_LOGO.png",
                  method: "GET",
                  headers: { "Cache-Control": "no-cache" },
                  body: "",
                }}
                style={constatariSorin.daminaLogo}
              />
            </View>

            {/* <View style={constatariSorin.lineContainer}></View> */}

            <View style={constatariSorin.flexContainer}>
              <View style={constatariSorin.verticalFlexContainer}>
                <Text style={constatariSorin.italicText}>{data.executant}</Text>
                <Text style={constatariSorin.italicText}>
                  {data.tip_activitate}
                </Text>
              </View>
              <View style={constatariSorin.verticalFlexContainerRight}>
                <Text style={constatariSorin.italicText}>
                  Tel: +40 743 200 395
                </Text>
                <Text style={constatariSorin.italicText}>
                  Email: management@damina.ro
                </Text>
              </View>
            </View>

            <View style={constatariSorin.lineContainer}></View>

            <View style={constatariSorin.mainVerticalFlexContainer}>
              <View style={constatariSorin.flexJustifyBetween}>
                <Text style={constatariSorin.mainTitleBoxes}>
                  Constatare:{" "}
                  <Text style={constatariSorin.smallerText}>
                    {data.denumire_lucrare}
                  </Text>
                </Text>
                <Text style={constatariSorin.mainTitleBoxes}>
                  Data:{" "}
                  <Text style={constatariSorin.smallerText}>{data.data}</Text>
                </Text>
              </View>
              <Text style={constatariSorin.mainTitleBoxes}>
                Zona:{" "}
                <Text style={constatariSorin.smallerText}>{data.zona}</Text>
              </Text>

              <Text style={constatariSorin.mainTitleBoxes}>
                Detalii Constatare:{" "}
              </Text>
              <Text style={constatariSorin.detaliiText}>{data.detalii}</Text>
            </View>
          </View>
        </Page>
        {imagini.length <= 6 ? (
          <Page style={constatariSorin.pageBody} size="A4" wrap>
            <View style={constatariSorin.mainContainer}>
              <Text style={constatariSorin.mainTitlePoze}>
                Galerie Constatare
              </Text>
              <View style={constatariSorin.imageFlexBox}>
                {imagini.map((img: any, i: any) => {
                  return (
                    <Image
                      key={i}
                      src={{
                        uri: img.url,
                        method: "GET",
                        headers: { "Cache-Control": "no-cache" },
                        body: "",
                      }}
                      style={constatariSorin.displayedImage}
                    />
                  );
                })}
              </View>
            </View>
          </Page>
        ) : (
          <>
            <Page style={constatariSorin.pageBody} size="A4" wrap>
              <View style={constatariSorin.mainContainer}>
                <Text style={constatariSorin.mainTitlePoze}>
                  Galerie Constatare
                </Text>
                <View style={constatariSorin.imageFlexBox}>
                  {imagini.map((img: any, i: any) => {
                    if (i <= 5)
                      return (
                        <Image
                          key={i}
                          src={{
                            uri: img.url,
                            method: "GET",
                            headers: { "Cache-Control": "no-cache" },
                            body: "",
                          }}
                          style={constatariSorin.displayedImage}
                        />
                      );
                  })}
                </View>
              </View>
            </Page>
            <Page style={constatariSorin.pageBody} size="A4" wrap>
              <View style={constatariSorin.mainContainer}>
                <Text style={constatariSorin.mainTitlePoze}>
                  Galerie Constatare
                </Text>
                <View style={constatariSorin.imageFlexBox}>
                  {imagini.map((img: any, i: any) => {
                    if (i > 5 && i <= 11)
                      return (
                        <Image
                          key={i}
                          src={{
                            uri: img.url,
                            method: "GET",
                            headers: { "Cache-Control": "no-cache" },
                            body: "",
                          }}
                          style={constatariSorin.displayedImage}
                        />
                      );
                  })}
                </View>
              </View>
            </Page>
          </>
        )}
      </Document>
    </>
  );
};
