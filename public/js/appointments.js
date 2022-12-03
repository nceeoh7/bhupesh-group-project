'use strict';

$(document).ready(function () {
  const changeAllTimeSlotState = (isDisabled) => {
    [
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '1:00',
      '1:30',
      '2:00',
    ].forEach((appointment) => {
      document.querySelector(
        `select[name="appointmentTime"] option[name="${appointment}"]`
      ).disabled = isDisabled;
    });
  };

  const changeTimeSlotsState = (appointments, disableSlot, selectedDate) => {
    appointments
      .split(',')
      .filter(
        (appointment) =>
          appointment.split('|')[0] == selectedDate.toISOString().split('T')[0]
      )
      .forEach((appointment) => {
        document.querySelector(
          `select[name="appointmentTime"] option[name="${
            appointment.split('|')[1].split(' ')[0]
          }"]`
        ).disabled = disableSlot;
      });
  };

  /* Admin Appointment Validation */
  const $appointmentDate = $('#appointment_form #appointmentDate');
  const $appointmentTime = $('#appointment_form #appointmentTime');
  const appointments = $('#appointment_form #appointments').val();
  const currentDateString = new Date().toISOString().split('T')[0];
  const currentDate = new Date(currentDateString);
  $($appointmentDate).attr('min', currentDateString);
  $($appointmentDate).on('change', (e) => {
    const selectedDate = new Date($($appointmentDate).val());
    selectedDate.setHours(
      selectedDate.getHours() + selectedDate.getTimezoneOffset() / 60
    );
    if (selectedDate.getTime() >= currentDate.getTime()) {
      $($appointmentTime).prop('disabled', false);
      $($appointmentTime).val('Select Timeslot');
      $('#appointment_submit').prop('disabled', true);
      changeAllTimeSlotState(false);
      if (appointments) {
        changeTimeSlotsState(appointments, true, selectedDate);
      }
    } else {
      $($appointmentTime).prop('disabled', true);
    }
  });

  $($appointmentTime).on('change', (e) => {
    if (e.target.value == 'Select Timeslot') {
      $('#appointment_submit').prop('disabled', true);
    } else {
      $('#appointment_submit').prop('disabled', false);
    }
  });

  /* G2 Appointment Validation */
  const $availableAppointmentDates = $('#g2_form #appointmentDate');
  const $availableAppointmentTimes = $('#g2_form #appointmentTime');
  const availableAppointments = $('#g2_form #appointments').val();
  $($availableAppointmentDates).attr('min', currentDateString);

  if ($($availableAppointmentTimes).attr('value')) {
    $($availableAppointmentTimes).prop('disabled', false);
    $($availableAppointmentTimes).val(
      $($availableAppointmentTimes).attr('value')
    );
    const selectedDate = new Date($($availableAppointmentDates).val());
    selectedDate.setHours(
      selectedDate.getHours() + selectedDate.getTimezoneOffset() / 60
    );
    changeAllTimeSlotState(true);
    changeTimeSlotsState(availableAppointments, false, selectedDate);
    document.querySelector(
      `select[name="appointmentTime"] option[name="${
        $($availableAppointmentTimes).attr('value').split(' ')[0]
      }"]`
    ).disabled = false;
  }

  $($availableAppointmentDates).on('change', (e) => {
    const selectedDate = new Date($($availableAppointmentDates).val());
    selectedDate.setHours(
      selectedDate.getHours() + selectedDate.getTimezoneOffset() / 60
    );
    if (selectedDate.getTime() >= currentDate.getTime()) {
      $($availableAppointmentTimes).prop('disabled', false);
      $($availableAppointmentTimes).val('Select Timeslot');
      $('#g2_submit').prop('disabled', true);
      changeAllTimeSlotState(true);
      if (availableAppointments) {
        changeTimeSlotsState(availableAppointments, false, selectedDate);
      }
    } else {
      $($availableAppointments).prop('disabled', true);
    }
  });

  $($availableAppointmentTimes).on('change', (e) => {
    if (e.target.value == 'Select Timeslot') {
      $('#g2_submit').prop('disabled', true);
    } else {
      $('#g2_submit').prop('disabled', false);
    }
  });

  const result = $('#result').attr('value');
  if (result) {
    document
      .querySelector(
        `select[name="result"] option[name="${result == 'true' ? "1" : "0"}"]`
      )
      .setAttribute('selected', 'selected');
  }

  const feedback = $('#feedback').attr('value');
  if (feedback) {
    $("#feedback").summernote('code', feedback)
  }
});
