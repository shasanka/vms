"use client";
import React, { useEffect, useRef, useState } from "react";

import { IEntry, IVisitor } from "@/interface/common";
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
} from "@react-pdf/renderer";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useSnackbar } from "notistack";
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "#E4E4E4",
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

const Pdf = ({ entry, visitor, qrUrl }: IPdfProps) => {
  return (
    <Document
      title="Visitor entry details"
      style={{
        height: "200px",
      }}
    >
      <Page
        size="A4"
        style={{
          // flexDirection: "row",
          backgroundColor: "#E4E4E4",
        }}
      >
        <View
          style={{
            margin: 10,
            padding: 10,
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Image src={qrUrl} style={{ width: 120, height: 100 }} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: 20,
            }}
          >
            <View style={{display:'flex',flexDirection:'row',flexGrow:1,gap:10}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "extralight",
                    color:'red'
                  }}
                >
                  Whom to meet:
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "semibold",
                  }}
                >
                  {entry.whomToMeet}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap:2,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "light",
                  }}
                >
                  Department:
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "semibold",
                  }}
                >
                  {entry.department}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                flexGrow:1
              }}
            >
              <Text style={{ fontSize: "14px", textAlign: "center" }}>
                Visitor name: {visitor.firstName} {visitor.lastName}
              </Text>
              <Text style={{ fontSize: "14px", textAlign: "center" }}>
                Phone No: {visitor.phoneNumber}
              </Text>
              <Text style={{ fontSize: "14px", textAlign: "center" }}>
                State: {visitor.state}
              </Text>
              <Text style={{ fontSize: "14px", textAlign: "center" }}>
                District: {visitor.district}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Test = () => {
  return <h1>Test</h1>;
};

export default Pdf;
