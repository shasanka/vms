"use client";
import React, { useEffect, useRef, useState } from "react";

import { IDProofType, IEntry, IVisitor } from "@/interface/common";
import { useQRCode } from "next-qrcode";
// import generatePDF, { Margin, usePDF } from "react-to-pdf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Canvas,
} from "@react-pdf/renderer";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useSnackbar } from "notistack";
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

interface IPdfProps {
  entry: Partial<IEntry>;
  visitor: IVisitor;
  qrUrl: string;
}
{
  /* <Image src={qrUrl} style={{ width: 120, height: 100 }} /> */
}

const Pdf = ({ entry, visitor, qrUrl }: IPdfProps) => {
  return (
    <Document
      title="Visitor entry details"
      style={{
        height: "200px",
      }}
    >
      <Page>
        <Hero qrUrl={qrUrl} />
        <View
          style={{
            marginLeft: 100,
            marginRight: 100,

            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <DataView label="Whom to meet" value={entry.whomToMeet!} />

          <DataView label="Department" value={entry.department!} />

          <DataView
            label="Visitor name"
            value={visitor.firstName + " " + visitor.lastName}
          />
          <DataView label="Phone No" value={visitor.phoneNumber.toString()} />
          <DataView label="Email ID" value={visitor.email || ""} />
          <DataView label="State" value={visitor.state} />
          <DataView label="District" value={visitor.district} />
          <DataView
            label="ID proof type"
            value={IDProofType[visitor.idProofType]}
          />
          <DataView label="ID proof number" value={visitor.idProofNumber} />
        </View>
      </Page>
    </Document>
  );
};

const DataView = ({ label, value }: { label: string; value: string }) => {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text>{label}: </Text>
      <Text>{value}</Text>
    </View>
  );
};

const Hero = ({ qrUrl }: { qrUrl: string }) => {
  return (
    <View
      style={{
        display: "flex",
        marginTop: 10,
        // flexDirection:'row',
        justifyContent: "center",
      }}
    >
      <Image
        src="https://static.wikia.nocookie.net/logopedia/images/1/12/Assam_police.jpeg"
        style={{
          width: 50,
          height: 50,
          marginLeft: "auto",
          marginTop: 10,
          marginBottom: 10,
          marginRight: "auto",
        }}
      />
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Assam Police 
      </Text>
      <Canvas
        paint={(paintObj) =>
          paintObj
            .save()
            .lineWidth(2)
            .moveTo(5, 5) //move to position 100,100
            .lineTo(590, 5)
            .stroke()
        }
      ></Canvas>
      <Image
        src={qrUrl}
        style={{
          width: 200,
          height: 200,
          marginLeft: "auto",
          marginTop: 10,
          marginBottom: 10,
          marginRight: "auto",
        }}
      />
      <Canvas
        paint={(paintObj) =>
          paintObj
            .save()
            .lineWidth(2)
            .moveTo(5, 5) //move to position 100,100
            .lineTo(590, 5)
            .stroke()
        }
      ></Canvas>
    </View>
  );
};

export default Pdf;
