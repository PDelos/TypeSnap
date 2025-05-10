cronAdd("__pb_deleteoldrecords__", "0 0 * * *", async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);
  const formattedDate = sevenDaysAgo.toISOString();

  const records = await $app.dao().findRecordsByFilter(
    "photos",
    `created < "${formattedDate}"`,
    0, // offset
    0  // limit; 0 means no limit
  );

  for (const record of records) {
    await $app.dao().deleteRecord("your_collection", record.id);
    console.log(`Deleted record ${record.id}`);
  }
});
