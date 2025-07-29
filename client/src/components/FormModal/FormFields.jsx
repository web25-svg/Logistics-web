// src/components/FormModal/FormFields.jsx
import { Controller } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function FormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
     
      {/* Tracking ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="container_tracking_id" className="text-right">
          Tracking ID
        </Label>
        <Controller
          name="container_tracking_id"
          control={control}
          rules={{ required: 'Tracking ID is required' }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="container_tracking_id" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Released At */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="released_at" className="text-right">
          Released At
        </Label>
        <Controller
          name="released_at"
          control={control}
          rules={{ required: 'Release date is required' }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="released_at" type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Expected Arrival At */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="expected_arrival_at" className="text-right">
          Expected Arrival
        </Label>
        <Controller
          name="expected_arrival_at"
          control={control}
          rules={{ required: 'Expected arrival date is required' }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="expected_arrival_at" type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Status */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
