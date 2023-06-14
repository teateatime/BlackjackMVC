$(function () {
    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
});

$(function () {
    $(".subtitle").typed({
        strings: ["Programmer.", "Bookworm.", "Photographer.", "Adventurer.", "Amateur Football Player.", "Powerbuilder.", "Student of Life."],
        loop: true,
        typeSpeed: 0
    });
});

function scrollIntoView(eleID) {
   var e = document.getElementById(eleID);
   if (!!e && e.scrollIntoView) {
       e.scrollIntoView();
   }
}