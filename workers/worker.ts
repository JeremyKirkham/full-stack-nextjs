require("dotenv").config();

import throng from "throng";
import { Worker } from "bullmq";
import { redisConnection } from "./redisConnection";

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
let workers = process.env.WEB_CONCURRENCY || 1;

const start = () => {
  console.log("Started worker");

  // Connect to the named work queue
  new Worker("work", async (job) => {
    console.log("work queue started::", job.data);
  },
  {
    connection: redisConnection,
  });
};

// Initialize the clustered worker process
throng({ workers, start });