-- Basic Queries
-- 1
select * from airlines;
-- 2
select name from airlines where country = 'USA';
-- 3
select name from airports where city = 'New York';
-- 4 
select name, count(*) as totalFlight from airlines
join flights using (airlineID) group by name; 
-- 5
select * from flights where flightID = 101; 
-- Aggregation Functions
-- 6
select count(*) as totalFlight from flights;
-- 7
select sec_to_time(avg(time_to_sec(time(DepartureTime)))) as averageDepartureHour from flights;
-- 8 
select name, count(*) as totalFlight from airlines
join flights using (airlineID)
group by airlineID having totalFlight = (select count(*) from flights group by airlineID limit 1);
-- 9 
select ap.name, count(*) as outgoingFlight from airports ap
join flights f on ap.airportID = f.sourceairportID 
group by ap.name having outgoingFlight = (select count(*) from flights group by airlineID limit 1);
-- 10
select count(*) from passengers;
-- 11
select a.name, f.* from airlines a 
join flights f using (airlineID);
-- 12
select p.name, t.* from passengers p
join tickets t using (passengerID);
-- 13
select s.name as SourceAirportName, d.name as DestinationAirportName, f.*
from flights f 
join airports s on f.SourceAirportID = s.AirportID
join airports d on f.DestinationAirportID = d.AirportID;
-- 14
select p.name from passengers p 
join tickets t on p.PassengerID = t.PassengerID
join flights f on t.FlightID = f.FlightID
join airports ap on f.SourceAirportID = ap.AirportID
where ap.City = 'New York';
-- 15
select p.name from passengers p
join tickets t on p.PassengerID = t.PassengerID
join flights f on t.FlightID = f.FlightID
join airlines a on f.AirlineID = a.AirlineID
where a.name = 'Emirates';
-- Subqueries
-- 16
select * from passengers 
where PassengerID in (select t.PassengerID from tickets t
					join flights f on t.FlightID = f.FlightID
					join airlines a on f.AirlineID = a.AirlineID
					where a.name = 'Emirates');
-- 17
select * from flights 
where SourceAirportID in (select airportid from airports where city = 'New York'); 
-- 18
select name from passengers 
where PassengerID in (select t.PassengerID from tickets t
					join flights f on t.FlightID = f.FlightID
					join airlines a on f.AirlineID = a.AirlineID
                    join airports ap on f.SourceAirportID = ap.AirportID
					where a.name = 'Emirates'
                    and ap.city = 'New York');
-- 19
select * from flights where DepartureTime > (select avg(time_to_sec(time(DepartureTime))) as averageDepartureHour from flights);
-- 20 
select name from passengers p 
join tickets t on p.PassengerID = t.PassengerID
join flights f on t.FlightID = f.FlightID
where airlineID having totalFlight = (select count(*) from flights group by airlineID limit 1);