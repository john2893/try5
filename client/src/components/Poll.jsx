import React from 'react';
import { connect } from 'react-redux';
import {HorizontalBar} from 'react-chartjs-2';

import { vote } from '../store/actions';
import { color } from '../services/color';

const Poll = ({ poll, vote }) => {
  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

  const data = {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
	borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: poll.options.map(option => option.votes),
      },
    ],
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <HorizontalBar data={data} />
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);
