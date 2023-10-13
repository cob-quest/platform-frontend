// "use client";
// import { UserPlusIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
// import {
//   Card,
//   CardHeader,
//   Button,
//   CardBody,
//   Chip,
//   CardFooter,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";

// const TABLE_HEAD = [
//   "Challenge",
//   "Participant",
//   "Status",
//   "Time and date",
//   "Re-send",
// ];

// const TABLE_ROWS = [
//   {
//     name: "John Michael",
//     email: "john@creative-tim.com",
//     job: "Manager",
//     org: "Organization",
//     online: true,
//     date: "23/04/18",
//   },
//   {
//     name: "Alexa Liras",
//     email: "alexa@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: false,
//     date: "23/04/18",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
//     name: "Laurent Perrier",
//     email: "laurent@creative-tim.com",
//     job: "Executive",
//     org: "Projects",
//     online: false,
//     date: "19/09/17",
//   },
//   {
//     name: "Michael Levi",
//     email: "michael@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: true,
//     date: "24/12/08",
//   },
//   {
//     name: "Richard Gran",
//     email: "richard@creative-tim.com",
//     job: "Manager",
//     org: "Executive",
//     online: false,
//     date: "04/10/21",
//   },
// ];

// export default function ChallengeResults() {
//   return (
//     <Card className="h-full w-full">
//       <CardHeader floated={false} shadow={false} className="rounded-none">
//         <div className="m-8 flex items-center justify-between gap-5">
//           <div>
//             <h1 className="font-bold text-3xl">Overall Challenge Results</h1>
//           </div>
//           <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//             <Button variant="outlined" size="sm">
//               view all
//             </Button>
//             <Button className="flex items-center gap-3" size="sm">
//               <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add challenge
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardBody className="overflow-scroll px-0">
//         <table className="p-4 w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="border-y border-blue-gray-100 -blue-graybg-50/50 p-4 text-sm"
//                 >
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {TABLE_ROWS.map(({ name, job, org, online, date }, index) => {
//               const isLast = index === TABLE_ROWS.length - 1;
//               const classes = isLast
//                 ? "p-4 "
//                 : "p-4 border-b border-blue-gray-50";

//               return (
//                 <tr key={name}>
//                   <td className={classes}>
//                     <div className="flex items-center gap-3">
//                       <div className="flex flex-col text-sm">{name}</div>
//                     </div>
//                   </td>
//                   <td className={classes}>
//                     <div className="flex flex-col">
//                       {job}

//                       {org}
//                     </div>
//                   </td>
//                   <td className={classes}>
//                     <div className="w-max">
//                       <Chip
//                         variant="ghost"
//                         size="sm"
//                         value={online ? "PASSED" : "FAILED"}
//                         color={online ? "green" : "red"}
//                       />
//                     </div>
//                   </td>
//                   <td className={classes}>{date}</td>
//                   <td className={classes}>
//                     <Tooltip content="Re-send Challenge">
//                       <IconButton variant="text">
//                         <PaperAirplaneIcon className="h-4 w-4" />
//                       </IconButton>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </CardBody>
//       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         Page 1 of 10
//         <div className="flex gap-2">
//           <Button variant="outlined" size="sm">
//             Previous
//           </Button>
//           <Button variant="outlined" size="sm">
//             Next
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";
import React from "react";
import { UserPlusIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = [
  "Challenge",
  "Participant",
  "Status",
  "Time and date",
  "Re-send",
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

function CustomTable() {
  return (
    <table className="p-4 w-full min-w-max table-auto text-left text-white">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
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
        {TABLE_ROWS.map(({ name, job, org, online, date }, index) => {
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={name}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-sm">{name}</div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  {job}
                  {org}
                </div>
              </td>
              <td className={classes}>
                <div className="w-max">
                  <span
                    className={`text-sm ${
                      online ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {online ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </td>
              <td className={classes}>{date}</td>
              <td className={classes}>
                <button
                  className="hover:text-blue-500"
                  onClick={() => handleResend(name)}
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

export default function ChallengeResults() {
  return (
    <div className="h-full w-full">
      <div className="m-8 text-white  flex items-center justify-between gap-5">
        <div>
          <h1 className="font-bold text-3xl">Overall Challenge Results</h1>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button className="border p-2 text-sm ">view all</button>
          <button
            className=" border p-2 flex items-center gap-2 p-2 text-sm"
            onClick={handleAddChallenge}
          >
            <UserPlusIcon className="h-4 w-4" />
            Add challenge
          </button>
        </div>
      </div>
      <CustomTable />
      {/* <div className="flex items-center justify-between border-t border-blue-gray-50 p-4 text-sm">
        Page 1 of 10
        <div className="flex gap-2">
          <button className="border p-2 text-sm">Previous</button>
          <button className="border p-2 text-sm">Next</button>
        </div>
      </div> */}
    </div>
  );
}

function handleAddChallenge() {
  // Handle adding a challenge
}

function handleResend(participantName) {
  // Handle resending a challenge to the participant
}
