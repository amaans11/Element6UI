import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		height: 485,
		overflow: 'auto',
        marginBottom:theme.spacing(2)
	},
	card: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(1),
		borderColor: 'white'
	},
    listCount:{
        color:"#1890ff",
        fontWeight:'bold'
    }
}));

const ArticleCard = () => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
				Sanofi to buy Blogen Hemophilia Spinoff for $11.6 Billion
			</Typography>
			<Box display="flex" flexDirection="row" justifyContent="space-between">
				<Box>
					<Typography>Topics:Waste and Water (+0.63)</Typography>
					<Typography>CH001203223 / ROCHE HLDG-Genius</Typography>
				</Box>
				<Box>
					<Typography>Bloomberg</Typography>
					<Typography>2021-02-12 11:09:20</Typography>
				</Box>
			</Box>
		</Card>
	);
};
const ArticleAnalysis = () => {
    const classes=useStyles()
	return (
		<React.Fragment>
			<Box className={classes.container}>{[ 1, 2, 3, 4,5 ].map(() => <ArticleCard />)}</Box>
            <Typography className={classes.listCount}>
                2351 matching articles found
            </Typography>
		</React.Fragment>
	);
};

export default ArticleAnalysis;
