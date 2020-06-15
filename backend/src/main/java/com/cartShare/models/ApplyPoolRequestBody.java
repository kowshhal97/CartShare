package com.cartShare.models;

public class ApplyPoolRequestBody {

	private Long appliedPoolId;
	private Long userId;
	private Long poolId;
	private Long referenceUserId;
	private String status;

	public Long getAppliedPoolId() {
		return appliedPoolId;
	}

	public void setAppliedPoolId(Long appliedPoolId) {
		this.appliedPoolId = appliedPoolId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getPoolId() {
		return poolId;
	}

	public void setPoolId(Long poolId) {
		this.poolId = poolId;
	}

	public Long getReferenceUserId() {
		return referenceUserId;
	}

	public void setReferenceUserId(Long referenceUserId) {
		this.referenceUserId = referenceUserId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
