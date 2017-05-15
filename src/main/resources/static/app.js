var sock = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    sock  = new SockJS('/ws');
    sock.onopen = function() {
        console.log('open');
        setConnected(true);
    };
    sock.onmessage = function(e) {
        console.log('message', e.data);
        $("#greetings").append("<tr><td>" + e.data + "</td></tr>");
    };
    sock.onclose = function() {
        console.log('Close');
        setConnected(false);
    };
}

function disconnect() {
    if (sock != null) {
    	sock.close();
    }
//    setConnected(false);
    console.log("Disconnected");
}

function sendText() {
	sock.send($("#name").val());
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendText(); });
});