chrome.runtime.onInstalled.addListener(() => {
  fetch("http://localhost:8000/home-directory")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.set(
        { homeDirectory: data.home_dir, osType: data.os_type },
        () => {
          console.log(
            "Home directory and OS type saved to local storage:",
            data
          );
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching home directory:", error);
      chrome.storage.local.set({ homeDirectoryError: error.message }, () => {
        console.log("Error message saved to local storage:", error.message);
      });
    });
});
