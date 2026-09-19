import React from "react";
import InfoAlert from "../../../Common/InfoAlert";
import Heading from "../../../Common/Heading";

export default function ParentalDetails() {
  return (
    <div>
      <InfoAlert text="Parental information is mandatory. In case of unknown  information please enter 'UNKNOWN'" />
      <Heading text="PARENTAL INFORMATION" />
    </div>
  );
}
