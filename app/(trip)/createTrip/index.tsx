import TripForm from "@/components/tripForm";
import { useCreateTrip } from "@/hooks/useTrip";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

const CreateTripScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const { mutateAsync } = useCreateTrip();

  const createTrip = () => {
    mutateAsync(
      {
        title,
        startDate,
        endDate,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const handleChangeText = useCallback(
    (text: string) => {
      setTitle(text);
    },
    [title]
  );

  return (
    <TripForm
      title={title}
      setTitle={setTitle}
      onPress={createTrip}
      handleChangeText={handleChangeText}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
};

export default CreateTripScreen;
