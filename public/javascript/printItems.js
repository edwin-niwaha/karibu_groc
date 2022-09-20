function PrintTable() {
    var divToPrint=document.getElementById("myTable");
    // newWin= window.open("");
    newWin= window.open('', '', 'height=300,width=600');
    // newWin.document.write(divToPrint.outerHTML);
    newWin.document.write('<html><head><title>Items Report</title>');
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('myTable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(wb, fn || ('Items Report.' + (type || 'xlsx')));
 }