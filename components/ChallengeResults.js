"use client";
import React from "react";
import { UserPlusIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const TABLE_HEAD = [
  "challenge",
  "participant",
  "status",
  "time and date",
  "re-send",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

function CustomTable(props) {
  return (
    <table className="w-full min-w-max table-auto text-left text-white">
      <thead>
        <tr>
          {props.tableHeader.map((head) => (
            <th
              key={head}
              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-sm"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tableBody.map((v, index) => {
          const isLast = index === props.tableBody.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={v.participant + v.challengeName}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-sm">{v.challengeName}</div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  {v.participant}
                </div>
              </td>
              <td
                key={v.participant + v.result}
                className={classes}>
                <div className="w-max">
                  {
                    v.result == 0 ? <span
                      className="text-amber-300"
                    >Not Attempted</span>
                      :
                      <span
                      > {v.result} / {100} </span>}
                </div>
              </td>
              <td className={classes}>
                <button
                  className="hover:text-blue-500"
                  onClick={() => props.handleResend(name)}
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ChallengeResults({
  router,
  rowHeader: header,
  rowBody: body,
}) {


  function handleAddChallenge() {
    // Handle adding a challenge
    router.push("/creator/create-challenge");
  }

  function handleResend(participantName) {
    // Handle resending a challenge to the participant
    console.log("handleResend:" + participantName)
  }

  return (
    <div className="h-full w-full">
      <div className="m-6 text-black bg-white p-1" >manage-challenge page (press q to quit)</div>
      <div className="m-8 text-white  flex items-center justify-between gap-5">
        <div>
          <h1 className="font-bold text-3xl">overall challenge results</h1>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            className=" border p-2 flex items-center gap-2 p-2 text-sm"
            onClick={handleAddChallenge}
          >
            <UserPlusIcon className="h-4 w-4" />
            add challenge
          </button>
        </div>
      </div>
      <CustomTable
        tableHeader={header}
        tableBody={body}
        handleResend={handleResend}
      />
    </div>
  );
}


