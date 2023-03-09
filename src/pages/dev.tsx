import { useState } from 'react';
import Head from 'next/head';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, Card } from '@mui/material';
import { Container, Stack } from '@mui/system';

import { MainLayout } from '@/layouts';

export default function DevPage() {
	const [items, setItems] = useState([1, 2, 3]);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		console.log(event);

		if (over) {
			if (active.id !== over.id) {
				setItems(items => {
					const oldIndex = items.indexOf(active.id as number);
					const newIndex = items.indexOf(over.id as number);

					return arrayMove(items, oldIndex, newIndex);
				});
			}
		}
	}
	return (
		<>
			<Head>
				<title>Dev page</title>
				<meta name='description' content='Generated by create next app' />
			</Head>
			<MainLayout>
				<h1>dev</h1>
				<Container>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
						modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
					>
						<SortableContext
							items={items}
							strategy={verticalListSortingStrategy}
						>
							<Stack spacing={1}>
								{items.map(id => (
									<SortableItem key={id} id={id} />
								))}
							</Stack>
						</SortableContext>
					</DndContext>
				</Container>
			</MainLayout>
		</>
	);
}

function SortableItem(props: { id: number }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Card
			sx={{
				p: 2,
				display: 'flex',
				justifyContent: 'space-between',
			}}
			ref={setNodeRef}
			style={style}
		>
			{props.id}
			<Button
				{...attributes}
				{...listeners}
				disableRipple={true}
				sx={{
					p: 0,
					m: 0,
					minWidth: 0,
					cursor: 'grab',
				}}
			>
				<DragIndicatorIcon />
			</Button>
		</Card>
	);
}
