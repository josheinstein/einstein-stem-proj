// Define dangerous file extensions, and their corresponding warning messages
var fileExtensions = {
    'zip': 'These files can contain malicious content',
    'exe': 'Executable files that can contain malware',
    'dll': 'Libraries of code that may be trying to replace system files',
    'com': 'Old DOS programs that look like web addresses to unsuspecting users',
    'bat': 'Files that may contain harmful instructions',
    'cmd': 'Files that may contain harmful instructions',
    'doc': 'A word document that can contain harmful macros',
    'docm': 'A word document that can contain harmful macros',
    'xls': 'Excel spread sheet that can contain harmful macros',
    'xlsm': 'Excel spread sheet that can contain harmful macros',
    'js': 'Javascript files that may contain dangerous scripts',
    'html': 'HTML files may contain Javascript that runs with local permissions',
    'vbs': 'VBscript files that may contain dangerous code',
    'reg': 'May overwrite the system registry with dangerous settings'
};

// Event handler that is called before Chrome downloads a file
// in order to give the extension the opportunity to suggest a
// file name for the downloaded file.
//
// Parameters:
//  item: The DownloadItem object representing the file about to be downloaded
//  suggest: A function that is called with the new file name suggestion
function downloads_onDeterminingFilename(item, suggest) {

    // Convert the file name to lowercase for consistent comparisons
    var filename = "", ext = "";
    filename = item.filename.toLowerCase();

    // Extract the file extension from the initial file name
    // Example:
    // If filename is "badfile.exe", then the extPos (position of the dot) would be: 7
    // If filename is "bad.file.exe", then extPos would be: 8
    // If filename is "badfileexe" (no dots), then extPos would be: -1
    var extPos = filename.lastIndexOf(".");
    if (extPos >= 0) {
        ext = filename.substring(extPos + 1);
    }

    if (fileExtensions.hasOwnProperty(ext)) {

        var message = fileExtensions[ext];

        // TODO: Post message to foreground script to show UI warning
        console.log("Warning: (" + ext + ") - " + message);

    }
    else {
        // File extension is not in the fileExtensions array, so we are assuming it is safe.
        console.log("Skipping " + ext + " download because it is not a monitored extension.");
    }

}

// Tell Chrome to call our function whenever a download is initiated
chrome.downloads.onDeterminingFilename.addListener(downloads_onDeterminingFilename);