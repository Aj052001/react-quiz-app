//import suffled array util
import { shuffleArray } from './utils';

//define question type
export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

// define question State type - add answers type (both correct and incorrect answers)
export type QuestionState = Question & { answers: string[] };

// use enum to describe difficulty types
export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}

export const fetchTrivia = async (amount: number, difficulty: Difficulty) => {
	//config endpoint
	const endpoint = `https://opentdb.com/api.php?amount=10`;

	// fetch trivia
	const resp = await fetch(endpoint);
	const data = await resp.json();
	return data.results.map((question: Question) => ({
		...question,
		answers: shuffleArray([ question.correct_answer, ...question.incorrect_answers ])
	}));
};
