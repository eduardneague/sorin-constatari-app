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
import { IndustrialePDFData, RaportImage } from "@/types/types";

interface ConstatareSorinProps {
  data: any;
  imagini: RaportImage[];
}

const raportIndustrialeStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "90%",
    width: "90%",
    padding: "20px",
    gap: "10px",
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
});

export const ConstatareSorin = ({ data, imagini }: ConstatareSorinProps) => {
  // console.log(imagini); // check data
  return (
    <>
      <Document>
        <Page style={raportIndustrialeStyles.pageBody} size="A4" wrap>
          <View style={raportIndustrialeStyles.mainContainer}>
            <Text style={raportIndustrialeStyles.bold}>
              Denumirea Lucrarii: {data.denumire_lucrare}
            </Text>
            <Text style={raportIndustrialeStyles.bold}>
              Descrierea Activitatii:
              <Text style={raportIndustrialeStyles.notBold}>
                {" "}
                {data.descriere}
              </Text>
            </Text>
            <View style={raportIndustrialeStyles.imageFlexBox}>
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
                    style={raportIndustrialeStyles.displayedImage}
                  />
                );
              })}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
