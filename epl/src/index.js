import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Base extends React.Component {

  state = {
    pointsArray: []
  };

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json')
      .then((response) => {
        let teams = {};
        function tally(match) {
          if (match.score1 > match.score2) {
            teams[match.team1.key].win += 1;
            teams[match.team2.key].lose += 1;
          } else if (match.score1 < match.score2) {
            teams[match.team2.key].win += 1;
            teams[match.team1.key].lose += 1;
          } else {
            teams[match.team1.key].draw += 1;
            teams[match.team2.key].draw += 1;
          }
        }
        response.data.rounds.forEach((day, i) => {
          // console.log(`Day ${i+1}`, day);
          day.matches.forEach(match => {
            if (match.team1.key in teams) {
              if (match.team2.key in teams) {
                tally(match);
              } else {
                teams[match.team2.key] = {
                  win: 0,
                  lose: 0,
                  draw: 0
                }
                tally(match);                 
              }
            } else {
              teams[match.team1.key] = {
                win: 0,
                lose: 0,
                draw: 0
              }
              if (match.team2.key in teams) {
                tally(match);
              } else {
                teams[match.team2.key] = {
                  win: 0,
                  lose: 0,
                  draw: 0
                }
                tally(match);                 
              }
            }
          })
        })
        // console.log(teams);
        let teamArray = [];
        for (let team in teams) {
          if (teams.hasOwnProperty(team)) {
            teamArray.push({key: team, win: teams[team].win, lose: teams[team].lose, draw: teams[team].draw}) 
          }
        }
        this.setState(() => ({
          pointsArray: teamArray
        }))
      })
      .catch((error) => {
        console.log('Error ', error);
      });
  }
  render() {
    return (
      <div>
        {this.state.pointsArray.map((team, i) => {
          return <p key={i}><strong>{team.key}</strong> - Won {team.win} - Lost {team.lose} - Draw {team.draw}</p>
        })}
      </div>
    )
  }
}

ReactDOM.render(<Base />, document.getElementById('start'));
