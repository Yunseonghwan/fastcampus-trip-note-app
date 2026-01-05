import TripForm from "@/components/tripForm";
import { useGetTrip, useUpdateTrip } from "@/hooks/useTrip";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

const UpdateTripScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const { data } = useGetTrip(tripId as string);
  const { mutateAsync } = useUpdateTrip();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
    }
  }, [data]);

  const updateTrip = () => {
    mutateAsync(
      {
        tripId: tripId as string,
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
      id={tripId as string}
      title={title}
      setTitle={setTitle}
      onPress={updateTrip}
      handleChangeText={handleChangeText}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
};

export default UpdateTripScreen;
