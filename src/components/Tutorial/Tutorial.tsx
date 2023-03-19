import {CMSTutorial, getCMSIntegration} from "../../assets/tutorial";
import {FC} from "react";

type Props = {
	tutorial: CMSTutorial;
}
export const Tutorial: () => Promise<JSX.Element> = async () => {
	const data = await getCMSIntegration('markdown');

	return (
		<>
			<TutorialPage tutorial={data.tutorial} />
		</>
	);
};

const TutorialPage: FC<Props> = ({tutorial}) => {

	return <>
			<div
				dangerouslySetInnerHTML={{ __html: tutorial.html }}
			/>
		</>;
};
