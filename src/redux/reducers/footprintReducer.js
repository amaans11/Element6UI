import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	portfolioEmission: {},
	sovFootprint: {},
	avoidedEmission: {},
	portDisclosure: {},
	benchDisclosure: {},
	carbonAttribution:{}
};
export default function footprintReducer(state = intialState, action) {
	switch (action.type) {
		case types.GET_PORTFOLIO_EMISSION_SUCCESS:
			return produce(state, (draft) => {
				draft.portfolioEmission.data = action.res;
				draft.portfolioEmission.error = '';
			});
		case types.GET_PORTFOLIO_EMISSION_FAILED:
			return produce(state, (draft) => {
				draft.portfolioEmission.data = {};
				draft.portfolioEmission.error = action.error;
			});
		case types.GET_SOV_FOOTPRINT_SUCCESS:
			return produce(state, (draft) => {
				draft.sovFootprint.data = action.res;
				draft.sovFootprint.error = '';
			});
		case types.GET_SOV_FOOTPRINT_FAILED:
			return produce(state, (draft) => {
				draft.sovFootprint.data = {};
				draft.sovFootprint.error = action.error;
			});
		case types.GET_AVOIDED_EMISSIONS_SUCCESS:
			return produce(state, (draft) => {
				draft.avoidedEmission.data = action.res;
				draft.avoidedEmission.error = '';
			});
		case types.GET_AVOIDED_EMISSIONS_FAILED:
			return produce(state, (draft) => {
				draft.avoidedEmission.data = {};
				draft.avoidedEmission.error = action.error;
			});
		case types.GET_DISCLOSURE_SUCCESS:
			return produce(state, (draft) => {
				if (action.portType === 'portfolio') {
					draft.portDisclosure.data = action.res;
					draft.portDisclosure.error = '';
				} else {
					draft.benchDisclosure.data = action.res;
					draft.benchDisclosure.error = '';
				}
			});
		case types.GET_DISCLOSURE_FAILED:
			return produce(state, (draft) => {
				console.log('action1>>', action);

				if (action.portType === 'portfolio') {
					draft.portDisclosure.data = {};
					draft.portDisclosure.error = action.error;
				} else {
					draft.benchDisclosure.data = {};
					draft.benchDisclosure.error = action.error;
				}
			});
		case types.GET_CARBON_ATTRIBUTION_SUCCESS:
			return produce(state, (draft) => {
				draft.carbonAttribution.data = action.res;
				draft.carbonAttribution.error = '';
			});
		case types.GET_CARBON_ATTRIBUTION_FAILED:
			return produce(state, (draft) => {
				draft.carbonAttribution.data = {};
				draft.carbonAttribution.error = action.error;
			});
		default:
			return state;
	}
}
