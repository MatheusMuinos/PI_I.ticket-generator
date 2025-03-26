document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var event = document.getElementById('event').value;
    var date = new Date(document.getElementById('date').value).toLocaleDateString();

    document.getElementById('personName').textContent = name;
    document.getElementById('eventName').textContent = event;
    document.getElementById('eventDate').textContent = date;
});
